'use client';

import { RadioGroup, RadioGroupItem, Label } from '@/components/ui/';
import { OptionThemeSwitcher } from '@/components/layout';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export function PageStyle() {
  const { updateUserData, userData } = useUserContext();
  const { _id } = userData;
  const { theme } = useTheme();

  const [pageColor, setPageColor] = useState('monochrome');
  const [pageFont, setPageFont] = useState('cvpage');
  const { premium } = userData;

  useEffect(() => {
    const defaultColor = 'monochrome';
    const defaultFont = 'cvpage';

    setPageColor(userData.pageColor || defaultColor);
    setPageFont(userData.pageFont || defaultFont);

    if (!userData.pageColor) {
      updateUserData(_id, { pageColor: defaultColor });
    }

    if (!userData.pageFont) {
      updateUserData(_id, { pageFont: defaultFont });
    }
  }, [userData, _id, updateUserData]);

  const handleChangeColor = (color: string) => {
    if (!premium && (color === '2000' || color === 'electric purple')) {
      toast.error('This theme is only available for premium users.');
      return;
    }
    toast.success(`Theme changed to ${color.charAt(0).toUpperCase() + color.slice(1)} 🎉`);
    setPageColor(color);
    updateUserData(_id, { pageColor: color });
  };

  const handleChangeFont = (font: string) => {
    toast.success(`Font changed to ${font.charAt(0).toUpperCase() + font.slice(1)} 🎉`);
    setPageFont(font);
    updateUserData(_id, { pageFont: font });
  };

  const fonts = ['cvpage', 'montserrat', 'mono', 'lora'];

  const colors = [
    { label: 'monochrome', premiumOnly: false },
    { label: 'plain dark', premiumOnly: true },
  ];

  return (
    <>
      <div className="max-w-md space-y-6">
        <div>
          <h2 className="text-sm font-semibold mb-2">FONT</h2>
          <RadioGroup value={pageFont} onValueChange={handleChangeFont}>
            {fonts.map((font) => (
              <div key={font} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={font}
                  id={`font-${font}`}
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
          <RadioGroup value={pageColor} onValueChange={handleChangeColor}>
            {colors.map(({ label, premiumOnly }) => (
              <div key={label} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={label}
                  id={`color-${label}`}
                  disabled={!premium && premiumOnly}
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