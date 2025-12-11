import bcrypt
import jwt
from datetime import datetime, timedelta
from pyramid.view import view_config
from sqlalchemy.exc import IntegrityError
from ..models import User, JobSeeker

def get_user_id(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    token = auth_header[7:]
    try:
        secret = request.registry.settings.get('jwt.secret', 'your_secret_key')
        payload = jwt.decode(token, secret, algorithms=['HS256'])
        return payload.get('user_id')
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@view_config(route_name='register', request_method='GET', renderer='json')
def register_get(request):
    return {'message': 'Use POST to register with name, email, password, role'}

@view_config(route_name='register', request_method='POST', renderer='json')
def register(request):
    data = request.json_body
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    
    if not all([name, email, password, role]):
        return {'error': 'Missing fields'}, 400
    
    if role not in ['job_seeker', 'employer']:
        return {'error': 'Invalid role'}, 400
    
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = User(name=name, email=email, password=hashed.decode('utf-8'), role=role)
    
    try:
        request.dbsession.add(user)
        request.dbsession.flush()
        if role == 'job_seeker':
            seeker = JobSeeker(user_id=user.id)
            request.dbsession.add(seeker)
        return {'message': 'User registered', 'user_id': user.id}
    except IntegrityError:
        return {'error': 'Email already exists'}, 400

@view_config(route_name='login', request_method='GET', renderer='json')
def login_get(request):
    return {'message': 'Use POST to login with email and password'}

@view_config(route_name='login', request_method='POST', renderer='json')
def login(request):
    data = request.json_body
    email = data.get('email')
    password = data.get('password')
    
    if not all([email, password]):
        return {'error': 'Missing fields'}, 400
    
    user = request.dbsession.query(User).filter_by(email=email).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return {'error': 'Invalid credentials'}, 401
    
    secret = request.registry.settings.get('jwt.secret', 'your_secret_key')
    token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(hours=24)}, secret, algorithm='HS256')
    return {'token': token, 'role': user.role}

@view_config(route_name='me', request_method='GET', renderer='json')
def get_me(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user:
        return {'error': 'User not found'}, 404
    return {'id': user.id, 'name': user.name, 'email': user.email, 'role': user.role}