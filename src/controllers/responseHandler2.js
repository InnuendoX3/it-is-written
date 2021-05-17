const errorResponse = (status, message) => ({
  status,
  message
})

const responseHandler = async (res, action) => {
  try {
    const response = await action()
    const status = response.status || 200
    const body = response.body

    res.status(status).json(body)

  } catch (error) {
    console.error(error)
    const status = error.status || 500
    const message = error.message || 'Internal server error'

    res.status(status).json({ 
      status: status,
      error: message
     })
  }
}

module.exports = {
  errorResponse,
  responseHandler
}