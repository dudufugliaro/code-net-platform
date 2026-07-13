import requests

# 1. Create a user (or test with a pre-existing if possible, but let's try to just hit the API without token first to see if it rejects us correctly)
res = requests.post('http://localhost:8000/api/mensagens/', json={"titulo": "Test", "conteudo": "Test"})
print("No token:", res.status_code, res.text)
