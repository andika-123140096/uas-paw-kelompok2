from pyramid.view import view_config
from sqlalchemy.orm import joinedload
from ..models import Job, User

@view_config(route_name='jobs', request_method='GET', renderer='json')
def list_jobs(request):
    query = request.dbsession.query(Job).options(joinedload(Job.employer))
    title = request.params.get('title')
    location = request.params.get('location')
    salary_min = request.params.get('salary_min')
    salary_max = request.params.get('salary_max')
    type_ = request.params.get('type')
    
    if title:
        query = query.filter(Job.title.ilike(f'%{title}%'))
    if location:
        query = query.filter(Job.location.ilike(f'%{location}%'))
    if type_:
        query = query.filter(Job.type.ilike(f'%{type_}%'))
    if salary_min:
        try:
            min_val = int(salary_min)
            query = query.filter(Job.salary >= str(min_val))
        except ValueError:
            pass
    if salary_max:
        try:
            max_val = int(salary_max)
            query = query.filter(Job.salary <= str(max_val))
        except ValueError:
            pass
    
    jobs = query.all()
    return [{'id': j.id, 'title': j.title, 'description': j.description, 'requirements': j.requirements, 'salary': j.salary, 'location': j.location, 'type': j.type, 'employer': j.employer.name if j.employer else None} for j in jobs]

@view_config(route_name='job_detail', request_method='GET', renderer='json')
def get_job(request):
    job_id = int(request.matchdict['id'])
    job = request.dbsession.query(Job).options(joinedload(Job.employer)).filter_by(id=job_id).first()
    if not job:
        return {'error': 'Job not found'}, 404
    return {'id': job.id, 'title': job.title, 'description': job.description, 'requirements': job.requirements, 'salary': job.salary, 'location': job.location, 'type': job.type, 'employer': job.employer.name if job.employer else None}

@view_config(route_name='create_job', request_method='GET', renderer='json')
def create_job_get(request):
    return {'message': 'Use POST to create job'}

@view_config(route_name='create_job', request_method='POST', renderer='json', permission='create_job')
def create_job(request):
    user_id = request.authenticated_userid
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    
    data = request.json_body
    title = data.get('title')
    description = data.get('description')
    requirements = data.get('requirements')
    salary = data.get('salary')
    location = data.get('location')
    type_ = data.get('type')
    
    if not all([title, description, requirements, salary, location, type_]):
        return {'error': 'Missing fields'}, 400
    
    job = Job(employer_id=int(user_id), title=title, description=description, requirements=requirements, salary=salary, location=location, type=type_)
    request.dbsession.add(job)
    request.dbsession.flush()
    return {'message': 'Job created', 'job_id': job.id}

@view_config(route_name='job_detail', request_method='PUT', renderer='json', permission='edit_job')
def update_job(request):
    user_id = request.authenticated_userid
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    
    job_id = int(request.matchdict['id'])
    job = request.dbsession.query(Job).filter_by(id=job_id, employer_id=int(user_id)).first()
    if not job:
        return {'error': 'Job not found or not yours'}, 404
    
    data = request.json_body
    if 'title' in data:
        job.title = data['title']
    if 'description' in data:
        job.description = data['description']
    if 'requirements' in data:
        job.requirements = data['requirements']
    if 'salary' in data:
        job.salary = data['salary']
    if 'location' in data:
        job.location = data['location']
    if 'type' in data:
        job.type = data['type']
    
    return {'message': 'Job updated'}

@view_config(route_name='job_detail', request_method='DELETE', renderer='json', permission='delete_job')
def delete_job(request):
    user_id = request.authenticated_userid
    if not user_id:
        return {'error': 'Unauthorized'}, 401
    
    job_id = int(request.matchdict['id'])
    job = request.dbsession.query(Job).filter_by(id=job_id, employer_id=int(user_id)).first()
    if not job:
        return {'error': 'Job not found or not yours'}, 404
    
    request.dbsession.delete(job)
    return {'message': 'Job deleted'}