interface DropdownItemProps {
  children: React.ReactNode;
}

export default function DropdownMenuItem({ children }: DropdownItemProps) {
  return (
    <li className='cursor-pointer rounded-sm px-4 py-1 font-md-regular text-gray-700 hover:bg-violet-500-8 hover:text-violet-500'>
      {children}
    </li>
  );
}
