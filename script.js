document.getElementById("buscar").addEventListener("click", async function() {
    const cep = document.getElementById("cep").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    
    if (cep) {
      buscarEndereco(cep);
    }
    
    if (latitude && longitude) {
      buscarPrevisao(latitude, longitude);
    }
  });
  
  async function buscarEndereco(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        document.getElementById("resultado").innerHTML = `
          <h3>Resultado da busca por CEP:</h3>
          <p><strong>Logradouro:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Localidade:</strong> ${data.localidade} - ${data.uf}</p>
        `;
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço", error);
    }
  }
  
  async function buscarPrevisao(latitude, longitude) {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const data = await response.json();
      
      if (data.current_weather) {
        document.getElementById("resultado").innerHTML += `
          <h3>Previsão do tempo na região:</h3>
          <p>Temperatura atual: ${data.current_weather.temperature}°C</p>
        `;
      }
    } catch (error) {
      console.error("Erro ao buscar previsão do tempo", error);
    }
  }
  