import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  showBack?: boolean;
  showHome?: boolean;
  className?: string;
}

export default function Navigation({ showBack = true, showHome = true, className = "" }: NavigationProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!showBack && !showHome) return null;

  return (
    <div className={`flex gap-2 mb-4 ${className}`}>
      {showBack && (
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
      )}
      {showHome && (
        <button
          onClick={handleHome}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Icon name="Home" size={16} />
          Главная
        </button>
      )}
    </div>
  );
}