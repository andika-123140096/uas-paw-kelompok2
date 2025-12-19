import os
import uuid
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPUnauthorized, HTTPForbidden, HTTPNotFound
from ..models import User, JobSeeker
from .auth import get_user_id

@view_config(route_name='profile', request_method='GET', renderer='json')
def get_profile(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'job_seeker':
        return {'error': 'Forbidden'}, 403
    seeker = request.dbsession.query(JobSeeker).filter_by(user_id=user_id).first()
    return {'name': user.name, 'email': user.email, 'skills': seeker.skills if seeker else None, 'experience': seeker.experience if seeker else None, 'cv_url': seeker.cv_url if seeker else None}

@view_config(route_name='profile', request_method='PUT', renderer='json')
def update_profile(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'job_seeker':
        return {'error': 'Forbidden'}, 403
    seeker = request.dbsession.query(JobSeeker).filter_by(user_id=user_id).first()
    if not seeker:
        return {'error': 'Profile not found'}, 404
    
    data = request.json_body
    if 'name' in data:
        user.name = data['name']
    if 'skills' in data:
        seeker.skills = data['skills']
    if 'experience' in data:
        seeker.experience = data['experience']
    if 'cv_url' in data:
        seeker.cv_url = data['cv_url']
    
    return {'message': 'Profile updated'}

@view_config(route_name='upload_cv', request_method='POST', renderer='json')
def upload_cv(request):
    user_id = get_user_id(request)
    if not user_id:
        raise HTTPUnauthorized(json={'error': 'Unauthorized'})
    
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'job_seeker':
        raise HTTPForbidden(json={'error': 'Forbidden'})
    
    seeker = request.dbsession.query(JobSeeker).filter_by(user_id=user_id).first()
    if not seeker:
        raise HTTPNotFound(json={'error': 'Profile not found'})
    
    # Get uploaded file
    cv_file = request.POST.get('cv')
    if cv_file is None or not hasattr(cv_file, 'filename'):
        raise HTTPBadRequest(json={'error': 'No file uploaded'})
    
    # Check if file is PDF
    if not cv_file.filename.lower().endswith('.pdf'):
        raise HTTPBadRequest(json={'error': 'Only PDF files are allowed'})
    
    # Create uploads directory if it doesn't exist
    uploads_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
    os.makedirs(uploads_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = os.path.splitext(cv_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(uploads_dir, unique_filename)
    
    # Save file
    with open(file_path, 'wb') as output_file:
        cv_file.file.seek(0)
        output_file.write(cv_file.file.read())
    
    # Update database with file URL
    cv_url = f"/uploads/{unique_filename}"
    seeker.cv_url = cv_url
    
    return {'message': 'CV uploaded successfully', 'cv_url': cv_url}