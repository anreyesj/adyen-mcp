import { z } from "zod";
import { Client, ManagementAPI } from "@adyen/api-library";
import {
  GET_TERMINALS_DESCRIPTION,
  GET_TERMINALS_NAME,
  REASSIGN_TERMINAL_NAME,
  REASSIGN_TERMINAL_DESCRIPTION
} from "./constants";
import { Tool } from "../types";


// # Get Terminals Tool
// This tool retrieves a list of payment terminals based on various search parameters.
const getTerminalsRequestShape: z.ZodRawShape = {
  searchQuery: z.string().optional(),
  otpQuery: z.string().optional(),
  countries: z.string().optional(),
  merchantIds: z.string().optional(),
  storeIds: z.string().optional(),
  brandModels: z.string().optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
};

const getTerminalsRequestObject = z.object(getTerminalsRequestShape);

const getTerminals = async (
  client: Client,
  getTerminalsRequest: z.infer<typeof getTerminalsRequestObject>
) => {
  // explode the request object into individual variables
  const {
    searchQuery,
    otpQuery,
    countries,
    merchantIds,
    storeIds,
    brandModels,
    pageNumber,
    pageSize,
  } = getTerminalsRequest;

  const managementAPI = new ManagementAPI(client);
  try {
    // pass the variables as arguments to the library listTerminals method
    return await managementAPI.TerminalsTerminalLevelApi.listTerminals(
      searchQuery,
      otpQuery,
      countries,
      merchantIds,
      storeIds,
      brandModels,
      pageNumber,
      pageSize
    );
  } catch (e) {
    return "Failed to get terminals. Error: " + JSON.stringify(e);
  }
};

export const getTerminalsTool: Tool = {
  name: GET_TERMINALS_NAME,
  description: GET_TERMINALS_DESCRIPTION,
  arguments: getTerminalsRequestObject,
  invoke: getTerminals,
};

// # Reassign Terminal Tool 
// This tool reassigns a payment terminal to a different company account, merchant account, or store.
const reassignTerminalRequestShape: z.ZodRawShape = {
  terminalId: z.string(),
  companyId: z.string().optional(),
  merchantId: z.string().optional(),
  storeId: z.string().optional(),
  inventory: z.boolean().optional(),
};

const reassignTerminalRequestObject = z.object(reassignTerminalRequestShape);

const reassignTerminal = async (
  client: Client,
  reassignTerminalRequest: z.infer<typeof reassignTerminalRequestObject>
) => {
  const {
    terminalId,
    companyId,
    merchantId,
    storeId,
    inventory
  } = reassignTerminalRequest;

  const managementAPI = new ManagementAPI(client);
  try {
    await managementAPI.TerminalsTerminalLevelApi.reassignTerminal(
      terminalId,
      {
        companyId,
        merchantId,
        storeId,
        inventory,
      }
    );
    return `Terminal ${terminalId} reassignment initiated successfully.`;
  } catch (e) {
    return "Failed to reassign terminal. Error: " + JSON.stringify(e);
  }
};

export const reassignTerminalTool: Tool = {
  name: REASSIGN_TERMINAL_NAME,
  description: REASSIGN_TERMINAL_DESCRIPTION,
  arguments: reassignTerminalRequestObject,
  invoke: reassignTerminal,
};