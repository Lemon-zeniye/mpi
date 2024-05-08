import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DropdownCountry from "../Inputs/DropdownCountry";
import DropdownState from "../Inputs/DropdownState";
import DropdownCity from "../Inputs/DropdownCity";
import BasicInputLabel from "../Inputs/BasicInputLabel";

const ContactInfo = () => {
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState<IState[]>();
  const [cityData, setCityData] = useState<ICity[]>();
  const [selectCountry, setSelectCountry] = useState<ICountry>();
  const [state, setState] = useState<IState>();
  const [city, setCity] = useState<ICity>();
  const { register } = useForm();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(selectCountry?.isoCode));
  }, [selectCountry]);

  useEffect(() => {
    if (selectCountry?.isoCode && state?.isoCode) {
      setCityData(City.getCitiesOfState(selectCountry.isoCode, state.isoCode));
    }
  }, [selectCountry, state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h3
        className={`font-normal phone:text-2xl text-3xl text-center xs-phone:text-xl `}
      >
        Contact Information
      </h3>
      <form>
        <div className="grid grid-cols-2 gap-10 phone:flex phone:flex-col phone:gap-3 phone:justify-center phone:items-center xs-phone:flex xs-phone:flex-col xs-phone:gap-3 xs-phone:justify-center xs-phone:items-center">
          <DropdownCountry
            label={"Country"}
            options={countryData}
            selected={selectCountry}
            setSelected={setSelectCountry}
            name={""}
            containerStyle="z-40"
            register={register}
            onSubmit={() => {}}
            onOtherSubmit={() => {}}
            iconName="location_on"
            outline
          />
          {stateData ? (
            <DropdownState
              label={"State/Province"}
              options={stateData}
              selected={state}
              setSelected={setState}
              name={""}
              containerStyle="z-40"
              onSubmit={() => {}}
              onOtherSubmit={() => {}}
              iconName="location_on"
              outline
            />
          ) : (
            <DropdownState
              label={"No State"}
              options={[]}
              selected={state}
              setSelected={setState}
              name={""}
              containerStyle="z-40"
              onSubmit={() => {}}
              onOtherSubmit={() => {}}
              iconName="location_on"
              outline
            />
          )}
          {cityData && (
            <DropdownCity
              label={"City"}
              options={cityData}
              selected={city}
              setSelected={setCity}
              name={""}
              containerStyle="z-30"
              onSubmit={() => {}}
              onOtherSubmit={() => {}}
              iconName="location_on"
              outline
            />
          )}
          <BasicInputLabel
            iconName={"signpost"}
            outline={true}
            inputType={"text"}
            placeholder={"Enter you street Address"}
            name={"streetAddress"}
            register={register}
            label={"Street Address 1"}
          />
          <BasicInputLabel
            iconName={"signpost"}
            outline={true}
            inputType={"text"}
            placeholder={"Enter you street Address"}
            name={"streetAddress"}
            register={register}
            label={"Street Address 2"}
          />
          <BasicInputLabel
            iconName={"mark_email_read"}
            outline={true}
            inputType={"text"}
            placeholder={"Enter you street Address"}
            name={"streetAddress"}
            register={register}
            label={"Street Address 1"}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
