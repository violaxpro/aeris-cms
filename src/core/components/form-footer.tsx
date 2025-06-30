import { Button } from 'rizzui';
import cn from '../utils/class-names';

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  handleAltBtn?: () => void;
  handleExportBtn?: () => void;
  showExportBtn?: boolean;
  handleCreateBtn?: () => void;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function FormFooter({
  isLoading,
  altBtnText = 'Save as Draft',
  submitBtnText = 'Submit',
  className,
  handleAltBtn,
  handleExportBtn,
  handleCreateBtn,
  showExportBtn,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10',
        className,
        negMargin
      )}
    >
      {showExportBtn && (
        <Button
          variant="outline"
          className="w-full @xl:w-auto"
          onClick={handleExportBtn}
        >
          Export Product
        </Button>
      )}
      {/* <Button
        variant="outline"
        className="w-full @xl:w-auto"
        onClick={handleAltBtn}
      >
        {altBtnText}
      </Button> */}
      <Button
        type={handleCreateBtn ? 'button' : 'submit'}
        onClick={handleCreateBtn ? handleCreateBtn : undefined}
        isLoading={isLoading}
        className="w-full @xl:w-auto"
      >
        {submitBtnText}
      </Button>
    </div>
  );
}
