import { Button } from "@/components/ui/button";
import React from "react";

export const SubmitButton = ({isLoading} : {isLoading: boolean}) => {
  return (
    <Button disabled={isLoading} className="w-full cursor-pointer">
        {isLoading ? "Loading..." : "Submit"}
    </Button>
  );
};
