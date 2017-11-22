from importlib import import_module


for name in [
    'msa.api.users',
    'msa.api.posts',
    'msa.api.projects',
    'msa.api.pictures'
    ]:

    import_module(name)



