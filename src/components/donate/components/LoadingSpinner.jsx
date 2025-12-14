// src/components/donate/components/LoadingSpinner.jsx
import { BorderBox } from './BorderBox';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-12">
    <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
      <div className="w-8 h-8 flex items-center justify-center text-2xl animate-spin p-4">
        <i className="hn hn-brightness-low"></i>
      </div>
    </BorderBox>
    <span className="mt-4 text-gray-400 minecraftFont">Завантаження магазину...</span>
  </div>
);