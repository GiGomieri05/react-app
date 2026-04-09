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
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {erro && <p className="cep-erro">{erro}</p>}

      {resultado && (
        <div className="cep-resultado">
          <div className="cep-field"><span className="cep-label">Logradouro</span><span>{resultado.logradouro}</span></div>
          <div className="cep-field"><span className="cep-label">Bairro</span><span>{resultado.bairro}</span></div>
          <div className="cep-field"><span className="cep-label">Cidade</span><span>{resultado.localidade}</span></div>
          <div className="cep-field"><span className="cep-label">Estado</span><span>{resultado.uf}</span></div>
          <div className="cep-field"><span className="cep-label">CEP</span><span>{resultado.cep}</span></div>
        </div>
      )}
    </div>
  );
}

export default CepSearch;
