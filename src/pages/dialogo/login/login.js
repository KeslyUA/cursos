


document.getElementById("ingresar").addEventListener("click",async ()=>{
  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  if (!usuario || !contraseña) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const result = await login(usuario, contraseña);

  if (result.success) {
    alert("Inicio de sesión exitoso");
    // Aquí podrías redirigir al usuario a otra página
    window.location.href = "/Explorar"; // Ajusta según tu ruta
  } else {
    alert(result.message);
  }
}
)
