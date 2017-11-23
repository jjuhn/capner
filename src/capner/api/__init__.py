from importlib import import_module


for name in [
    'capner.api.users',
    'capner.api.posts',
    'capner.api.projects',
    'capner.api.pictures'
    ]:

    import_module(name)



