type PageIndicatorProps = {
  currentPage: number;
  totalPages: number;
};

export default function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <span className='text-sm text-gray-700' aria-live='polite'>
      {currentPage}페이지 중 {totalPages}페이지
    </span>
  );
}
