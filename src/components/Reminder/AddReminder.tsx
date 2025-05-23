import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoCloseSharp } from "react-icons/io5";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useRole } from "@/RoleContext";
import Role from "../auth/Role";
import AddClasses from "./CreateClassesForm";
import { Session } from "@/types/classes.type";
import TrainingForm from "./TrainingForm";
import { getTimeZoneAbbreviation } from "@/lib/utils";

const AddReminderSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1),
  description: z.string({ required_error: "Description is required" }).min(1),
  date: z.string({ required_error: "Date is required" }).min(1),
  type: z.string({ required_error: "Type is required" }),
  timezone: z
    .string({ required_error: "Timezone is required" })
    .default(Intl.DateTimeFormat().resolvedOptions().timeZone),
});

type AddReminderForm = z.infer<typeof AddReminderSchema>;

const AddReminder = forwardRef<
  HTMLDivElement,
  {
    date: string;
    setDate: Function;
    defaultType: string;
    initialClassData: Session | undefined;
    setDateFilter: Function;
  }
>(({ date, setDate, defaultType, initialClassData, setDateFilter }, ref) => {
  const form = useForm<AddReminderForm>({
    resolver: zodResolver(AddReminderSchema),
    defaultValues: {
      date,
      type: defaultType,
    },
  });

  const queryClient = useQueryClient();
  const { role }: any = useRole();

  const types = (
    role != null && role === "player"
      ? ["reminder", "goal", "training"]
      : ["reminder", "goal", "match", "training", "session"]
  ).map((item) => ({
    value: item,
    label: item.charAt(0).toUpperCase() + item.slice(1),
  }));

  const [selectedType, setSelectedType] = useState<string>(defaultType);

  const { isLoading, mutate } = useMutation(
    (data: AddReminderForm) => axios.post("/api/v1/reminders", data),
    {
      onSuccess(response) {
        toast.success("Reminder added successfully");
        const newReminder = response?.data?.[response.data.length - 1];
        const newReminderDate = new Date(newReminder?.date);
        newReminderDate && setDateFilter(newReminderDate);
        setDate("");
        queryClient.invalidateQueries("reminders");
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data.message ?? "Unable to add reminder"
        );
      },
    }
  );

  const onSubmit = (data: AddReminderForm) => {
    const timeZoneAbbreviation = getTimeZoneAbbreviation();
    const payload = {
      ...data,
      timezone: timeZoneAbbreviation
        ? timeZoneAbbreviation
        : Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    mutate(payload);
    // alert("working...");
  };

  useEffect(() => {
    function func() {
      form.setValue("date", date);
    }
    func();

    return () => {};
  }, [date]);

  return (
    <div
      className={`text-sm border rounded-lg m-1 px-2 py-1 ${
        date.length > 0 &&
        "shadow-lg shadow-primary duration-200 border border-primary"
      } `}
    >
      <div className="flex w-full justify-between">
        <div ref={ref} className="pb-2 font-semibold mt-2">
          Create Schedule {date.length > 0 && date}
        </div>
        <div
          onClick={() => setDate(null)}
          role="button"
          className="rounded-full h-fit w-fit my-auto p-1 bg-gray-200"
        >
          <FaX size={10} className="text" />
        </div>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium">
          Type
        </label>
        <Select
          value={form.watch("type")}
          onValueChange={(value: any) => {
            form.setValue("type", value);
            setSelectedType(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem
                key={type.value}
                value={type.value}
                className="capitalize"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.type && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.type.message}
          </p>
        )}
      </div>
      {selectedType === "session" ? (
        <AddClasses
          // ref={ref}
          setDate={setDate}
          setDateFilter={setDateFilter}
          date={date ?? undefined}
          initialClassData={initialClassData}
        />
      ) : selectedType === "training" ? (
        <TrainingForm
          date={date}
          setDate={setDate}
          setDateFilter={setDateFilter}
        />
      ) : (
        <form
          onSubmit={(e) => {
            onSubmit(form.getValues());
            e.preventDefault();
          }}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                autoFocus
                placeholder="Enter title"
                className="bg-white"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter description"
                rows={4}
                className="w-full border rounded-md p-2"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div
            // className={`grid grid-cols-${date.length > 0 ? "1" : "2"} gap-2`}
            >
              {/* <div>
                <label htmlFor="timezone" className="block text-sm font-medium">
                  Timezone
                </label>
                <Input
                  id="timezone"
                  placeholder="Enter timezone"
                  className="bg-white"
                  {...form.register("timezone")}
                />
                {form.formState.errors.timezone && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.timezone.message}
                  </p>
                )}
              </div> */}
              {date.length > 0 ? (
                <></>
              ) : (
                <div>
                  <label htmlFor="date" className="block text-sm font-medium">
                    Due Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    placeholder="Enter date"
                    {...form.register("date")}
                  />
                  {form.formState.errors.date && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.date.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            onClick={() => {}}
            className="flex my-5  w-full bg-primary py-2 shadow rounded-3xl px-12 items-center justify-center gap-2 text-white border border-gray-300"
          >
            {isLoading ? (
              <LoaderCircle
                style={{
                  animation: "spin 1s linear infinite",
                }}
              />
            ) : (
              "Create Schedule"
            )}
          </Button>
        </form>
      )}
    </div>
  );
});

export default AddReminder;
