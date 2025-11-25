import { Link } from 'react-router';

interface AuthSuggestion {
  message: string;
  linkText: string;
  to: string;
}

export default function AuthSuggestion({ message, linkText, to }: AuthSuggestion) {
  return (
    <div className='flex gap-[8px] text-gray-700'>
      <span>{message}</span>
      <Link className='text-primary underline underline-offset-3' to={to}>
        {linkText}
      </Link>
    </div>
  );
}
