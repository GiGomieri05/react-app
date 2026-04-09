import { useState } from 'react';

function CepSearch() {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function buscar() {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      setErro('CEP deve ter 8 dígitos.');
      return;
    }
    setLoading(true);
    setErro('');
    setResultado(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setResultado(data);
      }
    } catch {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') buscar();
  }

  const campos = resultado ? [
    { icon: 'fa-solid fa-road',     label: 'Logradouro', valor: resultado.logradouro },
    { icon: 'fa-solid fa-building', label: 'Bairro',     valor: resultado.bairro },
    { icon: 'fa-solid fa-city',     label: 'Cidade',     valor: resultado.localidade },
    { icon: 'fa-solid fa-flag',     label: 'Estado',     valor: resultado.uf },
    { icon: 'fa-solid fa-map-pin',  label: 'CEP',        valor: resultado.cep },
  ] : [];

  return (
    <div className="cep">
      <h2 className="component-title">Buscador de CEP</h2>

      <div className="cep-input-row">
        <input
          className="cep-input"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite o CEP..."
          maxLength={9}
        />
        <button className="cep-btn" onClick={buscar} disabled={loading}>
          <i className={loading ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-magnifying-glass'}></i>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {erro && (
        <p className="cep-erro">
          <i className="fa-solid fa-triangle-exclamation"></i>
          {erro}
        </p>
      )}

      {resultado && (
        <div className="cep-resultado">
          {campos.map(({ icon, label, valor }) => (
            <div key={label} className="cep-field">
              <span className="cep-label">
                <i className={icon}></i>
                {label}
              </span>
              <span>{valor}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CepSearch;
