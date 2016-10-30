"""
Django settings for FitnessTime project.

Generated by 'django-admin startproject' using Django 1.9.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os

#for aws frankurt
os.environ['S3_USE_SIGV4'] = 'True'
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

def get_setting(x, y=None):
    return os.getenv(x, y)

def str2bool(v):
    return v.lower() in ("yes", "true", "t", "1")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_setting('secret_key', '*)dvg_@fcu^np7q8^)n4+lh3ymil2p=xh%65sk^ss&4$csltmu')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = str2bool(get_setting('enable_debug', 'yes'))

ALLOWED_HOSTS = ['*', ]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'social.apps.django_app.default',
    'storages',
    'rest_framework',
    'imagekit',
    'common',
    'workout',
    'FitnessTime',
]

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

AUTHENTICATION_BACKENDS = [
    'social.backends.vk.VKOAuth2',
    'social.backends.google.GooglePlusAuth',
    'django.contrib.auth.backends.ModelBackend',
]

ROOT_URLCONF = 'FitnessTime.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social.apps.django_app.context_processors.backends',
                'social.apps.django_app.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'FitnessTime.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': get_setting('db_name', 'fitness_time'),
        'USER': get_setting('db_user', 'postgres'),
        'PASSWORD': get_setting('db_pass', ''),
        'HOST': get_setting('db_host', 'postgres'),
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = get_setting('static_root', os.path.join(BASE_DIR, 'static'))

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

LOGIN_URL = '/signin/'
LOGIN_REDIRECT_URL = '/app/'

REST_FRAMEWORK = {
    # 'DEFAULT_THROTTLE_CLASSES': (
    #     'rest_framework.throttling.AnonRateThrottle',
    #     'rest_framework.throttling.UserRateThrottle'
    # ),
    # 'DEFAULT_THROTTLE_RATES': {
    #     'anon': '10/min',
    #     'user': '30/min'
    # },
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',),
    'PAGE_SIZE': 10
}

SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'social.pipeline.user.create_user',
    'social.pipeline.social_auth.associate_user',
    # 'social.pipeline.debug.debug',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
    # 'social.pipeline.debug.debug',
)


AUTH_USER_MODEL = "common.User"

EMAIL_HOST = get_setting('email_host', 'smtprelay')
EMAIL_PORT = get_setting('email_port', 2525)

SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/app/'
SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = ['username', 'first_name', 'email']

#dev settgins
SOCIAL_AUTH_GOOGLE_PLUS_KEY=get_setting('google_plus_key', '867124234625-k249s24gko2gdgc4an7li96kecvei8dp.apps.googleusercontent.com')
SOCIAL_AUTH_GOOGLE_PLUS_SECRET=get_setting('google_plus_secret', 'p6oRoAe1I1XqcyNjNtoar4ns')
SOCIAL_AUTH_GOOGLE_PLUS_SCOPE = [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
]

#dev settgins
SOCIAL_AUTH_VK_OAUTH2_SECRET=get_setting('vk_oauth2_secret', '7PWAPV6LJwURRm2VLYm7')
SOCIAL_AUTH_VK_OAUTH2_KEY=get_setting('vk_oauth2_key', '5494236')
SOCIAL_AUTH_VK_OAUTH2_SCOPE=['email', ]

#media
if str2bool(get_setting('aws_enable', 'no')):
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_ACCESS_KEY_ID = get_setting('aws_access_key_id', 'AKIAICY4QBM4KE4WSWNA')
    AWS_STORAGE_BUCKET_NAME = get_setting('aws_storage_bucket_name', 'fitnesstime')
    AWS_SECRET_ACCESS_KEY = get_setting('aws_secret_access_key', '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')
    AWS_S3_SIGNATURE_VERSION = 's3v4'
    AWS_S3_REGION_NAME = 'eu-central-1'

