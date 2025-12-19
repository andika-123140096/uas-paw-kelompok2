import os
from dotenv import load_dotenv
from pyramid.config import Configurator

from .security import SecurityPolicy


# Module-level CORS tween factory so it is available as ``backend.cors_tween_factory``
# (dotted-name importable). This avoids import-resolution issues when running
# via paste/pserve that may prefer the installed package namespace.
def cors_tween_factory(handler, registry):
    settings = registry.settings
    allowed_origin = settings.get('cors.allowed_origin', '*')
    allow_credentials = settings.get('cors.allow_credentials', 'false').lower() == 'true'
    allow_methods = settings.get('cors.allow_methods', 'GET,POST,PUT,DELETE,OPTIONS')
    allow_headers = settings.get('cors.allow_headers', 'Authorization,Content-Type,Accept')
    max_age = settings.get('cors.max_age', '86400')

    def tween(request):
        if request.method == 'OPTIONS':
            from pyramid.response import Response
            resp = Response()
            resp.status_code = 200
            resp.headers.update({
                'Access-Control-Allow-Origin': allowed_origin,
                'Access-Control-Allow-Methods': allow_methods,
                'Access-Control-Allow-Headers': allow_headers,
                'Access-Control-Max-Age': max_age,
            })
            if allow_credentials:
                resp.headers['Access-Control-Allow-Credentials'] = 'true'
            return resp

        response = handler(request)
        response.headers.setdefault('Access-Control-Allow-Origin', allowed_origin)
        if allow_credentials:
            response.headers.setdefault('Access-Control-Allow-Credentials', 'true')
        return response

    return tween


def main(global_config, **settings):
    load_dotenv()
    # Override jwt.secret with JWT_SECRET from .env if available
    if 'JWT_SECRET' in os.environ:
        settings['jwt.secret'] = os.environ['JWT_SECRET']
    
    with Configurator(settings=settings, root_factory='.resources.Root') as config:
        config.include('pyramid_jinja2')
        config.include('.routes')
        config.include('.models')

        # Register CORS tween to handle preflight and add CORS headers
        # Use a dotted name pointing to the module-level function so Pyramid can import it
        config.add_tween('backend.cors_tween_factory')

        config.set_security_policy(
            SecurityPolicy(
                secret=settings.get('jwt.secret', 'your_secret_key'),
            ),
        )

        config.scan()
    return config.make_wsgi_app()
