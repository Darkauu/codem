from flask import Flask, render_template, url_for
import os
# from firebase_admin import credentials, auth, initialize_app
# import firebase_admin
# from firebase_admin import firestore

# Variables de entorno para seguridad
SECRET_PASS = os.getenv("SECRET_KEY")
JSON_DIR = 'static/json'

app = Flask(__name__)
app.secret_key = SECRET_PASS


# @app.route("/sign-up", methods=["GET", "POST"])
# def register():
#     if request.method == "POST":
#         # Obtener datos del formulario
#         first_name = request.form.get("firstName")
#         last_name = request.form.get("lastName")
#         email = request.form.get("email")
#         password = request.form.get("password")
#         confirm_password = request.form.get("confirmPassword")
#         terms = request.form.get("termsCheck")  # Si está marcado, tendrá valor, por ejemplo "on"
#
#         # Validaciones básicas
#         if not first_name or not last_name or not email or not password or not confirm_password:
#             flash("Todos los campos son obligatorios.")
#             return render_template("sign-up.html", firstName=first_name, lastName=last_name, email=email)
#
#         if password != confirm_password:
#             flash("Las contraseñas no coinciden.")
#             return render_template("sign-up.html", firstName=first_name, lastName=last_name, email=email)
#
#         if not terms:
#             flash("Debes aceptar los Términos y Condiciones.")
#             return render_template("sign-up.html", firstName=first_name, lastName=last_name, email=email)
#
#         try:
#             # Crear el usuario en Firebase Authentication
#             user = auth.create_user(email=email, password=password)
#
#             # Almacenar información adicional en Firestore
#             user_data = {
#                 "email": email,
#                 "first_name": first_name,
#                 "last_name": last_name,
#                 "created_at": firestore.SERVER_TIMESTAMP
#             }
#             db_firestore.collection("users").document(user.uid).set(user_data)
#
#             flash("Registro exitoso. Ahora puedes iniciar sesión.")
#             return redirect(url_for("login"))
#         except Exception as e:
#             flash("Error en el registro: " + str(e))
#             return render_template("sign-up.html", firstName=first_name, lastName=last_name, email=email)
#
#     return render_template("sign-up.html")
#
# @app.route('/login')
# def login():
#     return render_template('login.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/documentation')
def documentos():
    return render_template('documentation.html')

@app.route('/courses')
def cursos():
    return render_template('courses.html')

@app.route('/podcasts')
def podcasts():
    return render_template('podcasts.html')

@app.route('/about-us')
def nosotros():
    return render_template('about-us.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/terms_policy')
def terms():
    return render_template('terms-policy.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/donations')
def donations():
    return render_template('donations.html')

@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file('404.html'), 404

# Documents section
@app.route('/democracia-en-panama')
def democracia_en_panama():
    return render_template('docs/democracia-en-panama.html')

if __name__ == '__main__':
    app.run(debug=True)
