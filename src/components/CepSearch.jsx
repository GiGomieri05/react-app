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
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite o CEP..."
          maxLength={9}
        />
        <button onClick={buscar} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {resultado && (
        <div>
          <p><strong>Logradouro:</strong> {resultado.logradouro}</p>
          <p><strong>Bairro:</strong> {resultado.bairro}</p>
          <p><strong>Cidade:</strong> {resultado.localidade}</p>
          <p><strong>Estado:</strong> {resultado.uf}</p>
          <p><strong>CEP:</strong> {resultado.cep}</p>
        </div>
      )}
    </div>
  );
}

export default CepSearch;