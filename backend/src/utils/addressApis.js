// Address APIs for Lead Classification (ViaCEP → BrasilAPI → ReceitaWS fallback)
// Returns { success, data, error }

const axios = require('axios');

async function consultarViaCEP(cep) {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (data.erro) throw new Error('CEP não encontrado');
    return {
      success: true,
      data: {
        cep: data.cep,
        logradouro: data.logradouro,
        numero: '',
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        pais: 'Brasil'
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function consultarBrasilAPI(cnpj) {
  try {
    const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g, '')}`);
    return {
      success: true,
      data: {
        razao_social: data.razao_social,
        nome_fantasia: data.fantasia,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.municipio,
        estado: data.uf
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function consultarReceitaWS(cnpj) {
  try {
    const { data } = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj.replace(/\D/g, '')}`);
    return {
      success: true,
      data: {
        razao_social: data.nome,
        nome_fantasia: data.fantasia,
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.municipio,
        estado: data.uf
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function classificarEndereco(cep = null, cnpj = null) {
  const apis = [];
  
  if (cep) apis.push(consultarViaCEP(cep.replace(/\D/g, '')));
  if (cnpj) apis.push(consultarBrasilAPI(cnpj), consultarReceitaWS(cnpj));
  
  for (const api of apis) {
    const result = await api;
    if (result.success) return result;
  }
  
  return { success: false, error: 'Todas APIs falharam' };
}

module.exports = { classificarEndereco, consultarViaCEP, consultarBrasilAPI, consultarReceitaWS };

