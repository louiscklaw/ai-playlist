@REM pipenv --rm

pipenv install langchain-core
pipenv install langchain-community
pipenv lock
pipenv sync
