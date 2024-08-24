// types
import { type NextRequest } from "next/server";
import {
  type PopulateSearchParam,
  type SearchParams
} from "../types/searchParam";

export const generateSearchParams = (
  searchParams: SearchParams
): string => {
  const arrayParamType = (
    name: string,
    values?: string[]
  ) =>
    values && values.length
      ? `${name}=${values.join(",")}&`
      : "";

  const booleanParamType = (
    name: string,
    value?: boolean
  ) =>
    typeof value === "boolean"
      ? `${name}=${value ? "true" : "false"}&`
      : "";

  const numberParamType = (
    name: string,
    value?: number
  ) =>
    typeof value === "number" &&
    (value === 0 || value)
      ? `${name}=${value}&`
      : "";

  const stringifyPopulateParam = (
    level: number,
    populate: PopulateSearchParam
  ): string => {
    const path = `${populate.path}${populate.strict ? "_1" : "_0"}:${level}:`;
    const select =
      populate?.select && populate.select?.length
        ? populate.select.join(",")
        : "";
    const exclude =
      populate?.exclude &&
      populate.exclude?.length
        ? `-${populate.exclude.join(",")}`
        : `-${level}-`;
    const nestedPopulate =
      populate?.populate &&
      populate.populate.length
        ? `~${level}~${populate.populate.map((populate) => stringifyPopulateParam(level + 1, populate)).join(`;${level};`)}`
        : `~${level}~`;

    return `${path}${select}${exclude}${nestedPopulate}`;
  };

  const populateParamType = (
    populate?: PopulateSearchParam[]
  ) => {
    const populateParams: string[] = [];

    if (populate && populate?.length) {
      for (let populateParam of populate) {
        populateParams.push(
          stringifyPopulateParam(1, populateParam)
        );
      }
    }

    return populateParams.length
      ? `populate=${populateParams.join(";0;")}&`
      : "";
  };

  const stringParamType = (
    name: string,
    value?: string
  ) => (value ? `${name}=${value}&` : "");

  const select = arrayParamType(
    "select",
    searchParams?.select
  );
  const exclude = arrayParamType(
    "exclude",
    searchParams?.exclude
  );
  const populate = populateParamType(
    searchParams?.populate
  );
  const active = booleanParamType(
    "active",
    searchParams?.active
  );
  const deleted = booleanParamType(
    "deleted",
    searchParams?.deleted
  );
  const offset = numberParamType(
    "offset",
    searchParams?.offset
  );
  const limit = numberParamType(
    "limit",
    searchParams?.limit
  );
  const sortBy = stringParamType(
    "sortBy",
    searchParams?.sortBy
  );
  const orderBy = stringParamType(
    "orderBy",
    searchParams?.orderBy
  );
  const filterBy = stringParamType(
    "filterBy",
    searchParams?.filterBy
  );
  const keyword = stringParamType(
    "keyword",
    searchParams?.keyword
  );
  const fromDate = stringParamType(
    "fromDate",
    searchParams?.fromDate
  );
  const toDate = stringParamType(
    "toDate",
    searchParams?.toDate
  );

  return `?${select}${exclude}${populate}${active}${deleted}${offset}${limit}${sortBy}${orderBy}${filterBy}${keyword}${fromDate}${toDate}`;
};

export const extractSearchParams = (
  req: NextRequest
): SearchParams => {
  const arrayParamType = (
    name: string,
    value: null | string
  ) =>
    value ? { [name]: value.split(",") } : {};

  const booleanParamType = (
    name: string,
    value: null | string
  ) =>
    value &&
    (value === "true" || value === "false")
      ? { [name]: value === "true" || false }
      : {};

  const dateParamType = (
    name: string,
    value: null | string
  ) => {
    if (!value || !Date.parse(value)) {
      return {};
    }

    const [yearStr, monthStr, dateStr] =
      value.split("-");
    const [year, month, date] = [
      Number(yearStr),
      Number(monthStr),
      Number(dateStr)
    ];

    if (
      !year ||
      !(year >= 2000 && year <= 3000) ||
      !month ||
      !(month >= 1 && month <= 12) ||
      !date ||
      !(date >= 1 && date <= 31)
    ) {
      return {};
    }

    return { [name]: value };
  };

  const numberParamType = (
    name: string,
    value: null | string
  ) =>
    value &&
    (Number(value) === 0 || Number(value))
      ? { [name]: Number(value) }
      : {};

  const orderByParamType = (
    orderBy: null | string
  ): { orderBy?: "asc" | "desc" } =>
    orderBy &&
    (orderBy === "asc" || orderBy === "desc")
      ? { orderBy }
      : {};

  const parsePopulateParam = (
    level: number,
    populateParam: string
  ): PopulateSearchParam => {
    const [pathAndStrict, data] =
      populateParam.split(`:${level}:`);
    const [path, strict] =
      pathAndStrict?.split("_");
    const [select, excludeAndPopulates] =
      data?.split(`-${level}-`);
    const [exclude, populates] =
      excludeAndPopulates?.split(`~${level}~`);
    const populate =
      (populates &&
        populates
          ?.split(`;${level};`)
          ?.map((populate) =>
            parsePopulateParam(
              level + 1,
              populate
            )
          )) ||
      [];

    return {
      strict: strict === "1",
      path,
      ...(select
        ? { select: select.split(",") }
        : {}),
      ...(exclude
        ? { exclude: exclude.split(",") }
        : {}),
      ...(populate && populate?.length
        ? { populate }
        : {})
    };
  };

  const populateParamType = (
    value: null | string
  ) => {
    if (!value) {
      return {};
    }

    const populateParams = value.split(";0;");
    const populate: PopulateSearchParam[] = [];

    for (let populateParam of populateParams) {
      populate.push(
        parsePopulateParam(1, populateParam)
      );
    }

    return { populate };
  };

  const stringParamType = (
    name: string,
    value: null | string
  ) => (value ? { [name]: value } : {});

  const searchParams = req.nextUrl.searchParams;

  const select = searchParams.get("select");
  const exclude = searchParams.get("exclude");
  const populate = searchParams.get("populate");
  const active = searchParams.get("active");
  const deleted = searchParams.get("deleted");
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  const sortBy = searchParams.get("sortBy");
  const orderBy = searchParams.get("orderBy");
  const filterBy = searchParams.get("filterBy");
  const keyword = searchParams.get("keyword");
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");

  return {
    ...arrayParamType("select", select),
    ...arrayParamType("exclude", exclude),
    ...populateParamType(populate),
    ...booleanParamType("active", active),
    ...booleanParamType("deleted", deleted),
    ...numberParamType("offset", offset),
    ...numberParamType("limit", limit),
    ...stringParamType("sortBy", sortBy),
    ...orderByParamType(orderBy),
    ...stringParamType("filterBy", filterBy),
    ...stringParamType("keyword", keyword),
    ...dateParamType("fromDate", fromDate),
    ...dateParamType("toDate", toDate)
  };
};
