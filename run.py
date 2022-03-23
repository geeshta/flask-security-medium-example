from pathlib import Path

from werkzeug.serving import make_ssl_devcert

from app import server

cert_path = Path(__file__).parent / "cert"
cert_file = cert_path / "dev.crt"
key_file = cert_path / "dev.key"

if cert_file.exists() and key_file.exists():
    ssl_context = (cert_file, key_file)
else:
    ssl_context = make_ssl_devcert(str(cert_path / "dev"), host="localhost")

server.run(debug=True, ssl_context=ssl_context)
