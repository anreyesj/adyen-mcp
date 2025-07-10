export const GET_TERMINALS_NAME = "get_terminals";
export const GET_TERMINALS_DESCRIPTION = `Gets a list of payment terminals.

    Args:
        searchQuery (string, optional): Returns terminals with an ID that contains the specified string. If present, other query parameters are ignored.
        otpQuery (string, optional): Returns one or more terminals associated with the one-time passwords specified in the request. If this query parameter is used, other query parameters are ignored.
        countries (string, optional): Returns terminals located in the countries specified by their two-letter country code.
        merchantIds (string, optional): Returns terminals that belong to the merchant accounts specified by their unique merchant account ID.
        storeIds (string, optional): Returns terminals that are assigned to the stores specified by their unique store ID.
        brandModels (string, optional): Returns terminals of the models specified in the format "brand.model".
        pageNumber (integer, optional): The number of the page to fetch.
        pageSize (integer, optional): The number of items to have on a page, maximum 100. The default is 20 items on a page.

    Returns:
        object | string: The Adyen API response object reflecting the list of terminals that the API credential has access to and that match the query parameters.

    Notes:
        - Corresponds to the Adyen Management API GET /terminals endpoint.
        - No parameters are required. If the user does not ask for the results to be filtered, do not include any parameters in the request.
        - To make this request, your API credential must have the "Management API — Terminal actions read" role.
        - In the live environment, requests to this endpoint are subject to rate limits.

    Examples:
        get_terminals_mcp({searchQuery="P400"})
        # Returns the Adyen API response object listing terminals with "P400" in their ID, or an error string.`;

export const REASSIGN_TERMINAL_NAME = "reassign_terminal";
export const REASSIGN_TERMINAL_DESCRIPTION = `Reassigns a payment terminal to a different company account, merchant account, or store.

    Args:
        terminalId (string, required): The unique identifier of the payment terminal to reassign.
        companyId (string, optional): The unique identifier of the company account to reassign the terminal to.
        merchantId (string, optional): The unique identifier of the merchant account to reassign the terminal to.
        storeId (string, optional): The unique identifier of the store to reassign the terminal to.
        inventory (boolean, optional): Set to true to reassign the terminal to the inventory of the specified merchant account.

    Returns:
        string: A confirmation message indicating the result of the reassignment operation.

    Notes:
        - Corresponds to the Adyen Management API POST /terminals/{terminalId}/reassign endpoint.
        - Your API credential must have the "Management API—Assign Terminal" role to make this request.
        - When reassigning to a merchant account, you must specify the inventory field.

    Examples:
        reassign_terminal_mcp({terminalId="S1F2-000150183300034", storeId="YOUR_STORE_ID"})
        # Returns a success or error message.`;