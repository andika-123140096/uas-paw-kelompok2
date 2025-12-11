from pyramid.view import view_config
from sqlalchemy.orm import joinedload
from ..models import User, JobSeeker, Application, Job
from .auth import get_user_id

@view_config(route_name='applications', request_method='GET', renderer='json')
def apply_job_get(request):
    return {'message': 'Use POST to apply to job'}

@view_config(route_name='applications', request_method='POST', renderer='json')
def apply_job(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'job_seeker':
        return {'error': 'Forbidden'}, 403
    seeker = request.dbsession.query(JobSeeker).filter_by(user_id=user_id).first()
    if not seeker:
        return {'error': 'Profile not complete'}, 400
    
    data = request.json_body
    job_id = data.get('job_id')
    if not job_id:
        return {'error': 'Missing job_id'}, 400
    
    existing = request.dbsession.query(Application).filter_by(job_id=job_id, seeker_id=seeker.id).first()
    if existing:
        return {'error': 'Already applied'}, 400
    
    app = Application(job_id=job_id, seeker_id=seeker.id, status='pending')
    request.dbsession.add(app)
    request.dbsession.flush()
    return {'message': 'Applied', 'application_id': app.id}

@view_config(route_name='my_applications', request_method='GET', renderer='json')
def get_my_applications(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'job_seeker':
        return {'error': 'Forbidden'}, 403
    seeker = request.dbsession.query(JobSeeker).filter_by(user_id=user_id).first()
    apps = request.dbsession.query(Application).options(joinedload(Application.job)).filter_by(seeker_id=seeker.id).all()
    return [{'id': a.id, 'job_title': a.job.title, 'status': a.status, 'applied_date': str(a.applied_date)} for a in apps]

@view_config(route_name='job_applications', request_method='GET', renderer='json')
def get_job_applications(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'employer':
        return {'error': 'Forbidden'}, 403
    job_id = int(request.matchdict['job_id'])
    job = request.dbsession.query(Job).filter_by(id=job_id, employer_id=user_id).first()
    if not job:
        return {'error': 'Job not found or not yours'}, 404
    apps = request.dbsession.query(Application).options(joinedload(Application.seeker).joinedload(JobSeeker.user)).filter_by(job_id=job_id).all()
    return [{'id': a.id, 'seeker_name': a.seeker.user.name, 'status': a.status, 'applied_date': str(a.applied_date)} for a in apps]

@view_config(route_name='application_detail', request_method='PUT', renderer='json')
def update_application_status(request):
    user_id = get_user_id(request)
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    user = request.dbsession.query(User).filter_by(id=user_id).first()
    if not user or user.role != 'employer':
        return {'error': 'Forbidden'}, 403
    
    app_id = int(request.matchdict['id'])
    app = request.dbsession.query(Application).options(joinedload(Application.job)).filter_by(id=app_id).first()
    if not app or app.job.employer_id != user_id:
        return {'error': 'Application not found or not yours'}, 404
    
    data = request.json_body
    status = data.get('status')
    if status not in ['pending', 'shortlisted', 'rejected', 'accepted']:
        return {'error': 'Invalid status'}, 400
    
    app.status = status
    return {'message': 'Status updated'}