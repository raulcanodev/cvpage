'use client';
import { Switch, Button } from '@/components/ui/';
import { ThemeSwitcher } from '@/components/layout';
import { useUserContext } from '@/app/dashboard/context/UserContext';

type ColorTheme = 'light' | 'indigo' | 'green' | 'yellow' | 'red';

export function PageStyle() {
  const { updateUserData, userData } = useUserContext();
  const { _id } = userData;
  
  const { pageColor, pageFont } = userData;

  const handleChangeColor = (color: ColorTheme) => {
    updateUserData(_id, { pageColor: color });
  };

  const handleChangeFont = (font: string) => {
    updateUserData(_id, { pageFont: font });
  };

  const colorThemes: Record<ColorTheme, string> = {
    light: 'bg-white border-2 border-gray-300',
    indigo: 'bg-indigo-600',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-500',
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-md space-y-6">
        <div>
          <h2 className="text-sm font-semibold mb-2">FONT</h2>
          <div className="text-4xl">Aa</div>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-2">THEME</h2>
          <div className="flex space-x-3">
            {(Object.keys(colorThemes) as ColorTheme[]).map((color) => (
              <Button
                key={color}
                className={`w-8 h-8 rounded-md ${colorThemes[color]} ${
                  pageColor === color ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                }`}
                aria-label={`Select ${color} theme`}
                onClick={() => handleChangeColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <h2 className="text-sm font-semibold mb-2">DASHBOARD</h2>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}