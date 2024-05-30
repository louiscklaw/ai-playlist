import os,sys
from pprint import pprint

from langchain_core.messages import AIMessage, HumanMessage
from langchain_community.chat_models.coze import ChatCoze


chat = ChatCoze(
    coze_api_base="https://api.coze.com",
    coze_api_key="pat_74WFdC7gFjn5uqv9ghFXeYKzSS8hkvw9OpYcUmTzVYYXl1Ws9wFRAy7qCIJvGzuW",
    bot_id="7374659928813993991",
    user="123",
    conversation_id="",
    streaming=False,
)

response = chat([
  HumanMessage(content="""
Please take care the below information :

**Background Information**

Louis is a boy live in Hong Kong
""".strip()),
  HumanMessage(content="Where do louis live ?")
  ])

assert isinstance(response, AIMessage)
assert isinstance(response.content, str)

pprint(response)
