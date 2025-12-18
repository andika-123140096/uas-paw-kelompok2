from pyramid.authorization import Allow, Everyone


class Root:
    __acl__ = [
        (Allow, Everyone, 'view'),
        (Allow, 'group:employers', 'create_job'),
        (Allow, 'group:employers', 'edit_job'),
        (Allow, 'group:employers', 'delete_job'),
        (Allow, 'group:employers', 'view_applications'),
        (Allow, 'group:employers', 'manage_applications'),
        (Allow, 'group:job_seekers', 'apply_job'),
    ]

    def __init__(self, request):
        pass