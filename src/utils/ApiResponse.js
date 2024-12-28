const ResponseData = (res, { statusCode, status = "success", transaction, message }) => {
    const response = {
        status,
        message,
        transaction
    }

    return res.status(statusCode).json(response);
};

export default ResponseData;