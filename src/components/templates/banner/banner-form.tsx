import { useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export interface BannerFormInputs {
  title: string;
}

export const BannerForm = () => {
  const { register } = useFormContext<BannerFormInputs>();

  return (
    <>
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          {...register("title")}
          type="text"
          placeholder="Título"
          className="text-muted"
        />
      </div>
    </>
  );
};
