import { useFieldArray, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, FieldError, Input } from 'rizzui';
import FormGroup from '@/app_old/shared/form-group';
import { PiTrashBold } from 'react-icons/pi';
import { OptionFormInput } from '@/plugins/validators/create-option.schema';

export default function OptionValues({ className }: { className?: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<OptionFormInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'values',
  });

  return (
    <div className="flex flex-col gap-6 pt-6">
      <FormGroup
        title="Values"
        description="Values information about the attribute."
      >
        {fields?.map((item, index) => (
          <div key={index} className="flex items-center gap-4 xl:gap-7">
            <Input
              label="Value"
              className="w-full"
              {...control.register(`values.${index}.value`)}
              error={errors.values?.[index]?.value?.message as string}
            />

            <ActionIcon
              onClick={() => remove(index)}
              className="mt-7 shrink-0"
              variant="flat"
            >
              <PiTrashBold className="h-4 w-4" />
            </ActionIcon>
          </div>
        ))}
        <div className="col-span-full flex justify-end">
          <Button
            variant="flat"
            className="w-full text-xs capitalize @lg:w-auto sm:text-sm"
            onClick={() =>
              append({
                value: '',
              })
            }
          >
            Add New Value
          </Button>
        </div>
        <FieldError error={errors.values?.root?.message as string} />
      </FormGroup>
    </div>
  );
}
