from pyramid.view import view_config
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