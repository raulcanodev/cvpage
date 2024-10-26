'use client';
import { RadioGroup, RadioGroupItem, Label } from '@/components/ui/';
import { OptionThemeSwitcher } from '@/components/layout';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { toast } from 'sonner';

export function PageStyle() {
  const { updateUserData, userData } = useUserContext();
  const { _id } = userData;

  const { pageColor, pageFont, premium } = userData;

  const handleChangeColor = (color: string) => {
    if (!premium && (color === '2000' || color === 'electric purple')) {
      toast.error('This theme is only available for premium users.');
      return;
    }
    toast.success(`Theme changed to ${color.charAt(0).toUpperCase() + color.slice(1)} 🎉`);
    updateUserData(_id, { pageColor: color });
  };

  const handleChangeFont = (font: string) => {
    toast.success(`Font changed to ${font.charAt(0).toUpperCase() + font.slice(1)} 🎉`);
    updateUserData(_id, { pageFont: font });
  };

  const fonts = ['cvpage', 'montserrat', 'mono', 'lora'];

  const colors = [
    { label: 'monochrome', premiumOnly: false },
    // { label: 'midnight', premiumOnly: true },
    { label: 'plain dark', premiumOnly: true },
  ];

  return (
    <>
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
            {colors.map(({ label, premiumOnly }) => (
              <div key={label} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={label}
                  id={`color-${label}`}
                  disabled={!premium && premiumOnly}
                  onClick={() => handleChangeColor(label)}
                />
                <Label
                  htmlFor={`color-${label}`}
                  className={`capitalize ${!premium && premiumOnly ? 'text-gray-400' : ''}`}
                >
                  {label}
                  {!premium && premiumOnly && ' (Premium)'}
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
    </>
  );
}
