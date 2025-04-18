import { getChild } from "@/api/children.api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ContentLayout } from "../Sidebar/contenet-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

function ChildrenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("Profile");

  const { data, isLoading, isError } = useQuery(
    ["children", id],
    () => getChild(id as string),
    {
      enabled: !!id,
    }
  );

  if (!data) {
    return;
  }

  return (
    <ContentLayout>
      <div className="">
        <div>
          <div className="flex justify-center mb-4">
            <img
              src={data.player.avatar}
              alt={`${data.player.firstName} ${data.player.lastName}`}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">
              {data.player.firstName} {data.player.lastName}
            </h3>
            <p className="text-lg text-gray-600">
              {data.player.emailAddress.email}
            </p>
            <p className="my-1  text-primary">UTSA #18</p>
            <p className="text-lg text-gray-600">
              {data.player.phoneNumber.countryCode}{" "}
              {data.player.phoneNumber.number}
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="border border-red-500 bg-transparent px-4 py-2 text-red-500 rounded-lg">
              Remove Child
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              Message
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="Profile"
            className="w-full"
          >
            <TabsList className="flex bg-[#FFF6ED] rounded-full w-full md:w-[30rem] lg:w-[40rem] shadow-md h-[2.5rem] md:h-[3rem] mx-auto border">
              <TabsTrigger
                value="Profile"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="Matches"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger
                value="Goals"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Goals
              </TabsTrigger>
              <TabsTrigger
                value="Classes"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                Classes
              </TabsTrigger>
              <TabsTrigger
                value="SOT"
                className="flex-1 text-center py-1 text-sm md:text-base lg:text-lg rounded-full transition-colors data-[state=active]:bg-[#F2851C] data-[state=active]:text-white data-[state=inactive]:text-gray-700"
              >
                SOT
              </TabsTrigger>
            </TabsList>
            <TabsContent className="!mt-0 p-4" value="Profile">
              <h1 className="text-xl font-bold text-gray-700 mb-2">Parents</h1>
              {data?.player.parents.map((parent) => (
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl my-2">
                  <img
                    src={parent.avatar}
                    alt={`${parent.firstName} ${parent.lastName}`}
                    className="w-16 h-16 rounded-full object-cover flex-none"
                  />
                  <div>
                    <h1 className="font-lg font-bold">
                      {parent.firstName} {parent.lastName}
                    </h1>
                    <div className="flex items-center gap-2">
                      <AiOutlineMail /> {parent.emailAddress.email}
                    </div>
                  </div>
                </div>
              ))}

              <h1 className="text-xl font-bold text-gray-700 mb-2">Coaches</h1>
              {data?.player.coaches.map((coach) => (
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl my-2">
                  <img
                    src={coach.avatar}
                    alt={`${coach.firstName} ${coach.lastName}`}
                    className="w-16 h-16 rounded-full object-cover flex-none"
                  />
                  <div>
                    <h1 className="font-lg font-bold">
                      {coach.firstName} {coach.lastName}
                    </h1>
                    <div className="flex items-center gap-2">
                      <AiOutlineMail /> {coach.emailAddress.email}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent className="!mt-0" value="Matches"></TabsContent>
            <TabsContent className="!mt-0" value="Goals"></TabsContent>
            <TabsContent className="!mt-0" value="Classes"></TabsContent>
            <TabsContent className="!mt-0" value="SOT"></TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

export default ChildrenDetailPage;
