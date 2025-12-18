import jwt
from datetime import datetime
from pyramid.authorization import (
    ACLHelper,
    Authenticated,
    Everyone,
)
from .models import User


class SecurityPolicy:
    def __init__(self, secret):
        self.secret = secret
        self.acl = ACLHelper()

    def identity(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None
        token = auth_header[7:]
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            user_id = payload.get('user_id')
            if user_id:
                user = request.dbsession.query(User).filter_by(id=user_id).first()
                if user:
                    return {'userid': str(user_id), 'role': user.role}
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            pass
        return None

    def authenticated_userid(self, request):
        identity = self.identity(request)
        if identity is not None:
            return identity['userid']

    def remember(self, request, userid, **kw):
        # For JWT, remember is not used since tokens are stateless
        return []

    def forget(self, request, **kw):
        # For JWT, forget is not used
        return []

    def permits(self, request, context, permission):
        principals = self.effective_principals(request)
        return self.acl.permits(context, principals, permission)

    def effective_principals(self, request):
        principals = [Everyone]
        identity = self.identity(request)
        if identity is not None:
            principals += [Authenticated, 'u:' + identity['userid']]
            role = identity.get('role')
            if role == 'employer':
                principals.append('group:employers')
            elif role == 'job_seeker':
                principals.append('group:job_seekers')
        return principals