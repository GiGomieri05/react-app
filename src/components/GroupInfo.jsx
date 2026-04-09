import { useEffect } from 'react';

const grupo = {
  nome: 'Grupo I',
  membros: [
    { ra: '248936', nome: 'Elton Bueno Messias' },
    { ra: '248662', nome: 'Giovanni de Luca Gomieri' },
    { ra: '248151', nome: 'Guilherme Marques de Lima' },
    { ra: '248370', nome: 'Luis Fillipe De Medeiros Silva' },
    { ra: '249309', nome: 'Murilo Prestes de Quevedo' },
    { ra: '248674', nome: 'Vittorio Pivarci' },
  ],
};

function GroupInfo({ onClose }) {
  // Fecha com Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <div className="modal-title-block">
            <i className="fa-solid fa-users"></i>
            <span className="modal-title">{grupo.nome}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <ul className="modal-list">
          {grupo.membros.map((m, i) => (
            <li key={m.ra} className="modal-item">
              <span className="modal-index">{i + 1}</span>
              <span className="modal-ra">{m.ra}</span>
              <span className="modal-nome">{m.nome}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default GroupInfo;
