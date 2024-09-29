'use client';
import { RadioGroup, RadioGroupItem, Label } from '@/components/ui/';
import { OptionThemeSwitcher } from '@/components/layout';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { toast } from 'sonner';

export function PageStyle() {
  const { updateUserData, userData } = useUserContext();
  const { _id } = userData;

  const { pageColor, pageFont } = userData;

  const handleChangeColor = (color: string) => {
    toast.success(`Theme changed to ${color.charAt(0).toUpperCase() + color.slice(1)} 🎉`);
    updateUserData(_id, { pageColor: color });
  };

  const handleChangeFont = (font: string) => {
    toast.success(`Font changed to ${font.charAt(0).toUpperCase() + font.slice(1)} 🎉`);
    updateUserData(_id, { pageFont: font });
  };

  const fonts = ['sans', 'serif', 'mono'];
  const colors = ['monochrome', 'midnight', '2000', 'electric purple'];

  return (
    <div className="min-h-screen">
      <div className="max-w-md space-y-6">
        <div>
          <h2 className="text-sm font-semibold mb-2">FONT</h2>
          <RadioGroup defaultValue={pageFont}>
            {fonts.map((font) => (
              <div key={font} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={font}
                  id={`font-${font}`}
                  onClick={() => handleChangeFont(font)}
                />
                <Label htmlFor={`font-${font}`} className="capitalize">
                  {font}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-2">THEME</h2>

          <RadioGroup defaultValue={pageColor}>
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={color}
                  id={`color-${color}`}
                  onClick={() => handleChangeColor(color as ColorTheme)}
                />
                <Label htmlFor={`color-${color}`} className="capitalize">
                  {color}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="max-w-md space-y-62">
          <h2 className="text-sm font-semibold mb-2">DASHBOARD</h2>
          <div className="flex items-center space-x-2">
            <OptionThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
