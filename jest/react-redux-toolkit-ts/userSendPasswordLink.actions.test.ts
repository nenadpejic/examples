import { configureStore } from "@reduxjs/toolkit"
import { axiosAdminServer } from "services/axios"
import { sendUserPasswordLink } from "./userSendPasswordLink.actions"

describe("sendUserPasswordLink", () => {
  it("should pass", async () => {
    const email = "test@test.com"
    const postSpy = jest.spyOn(axiosAdminServer, 'post').mockResolvedValueOnce({ data: { success: true } })
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'users/sendUserPasswordLink/fulfilled':
            return action.payload
          default:
            return state
        }
      },
    })

    await store.dispatch(sendUserPasswordLink(email))

    expect(postSpy).toBeCalledWith('/api/adminserver/v1/users/passwordlink', { email })

    const state = store.getState()
    expect(state).toEqual({ success: true })
  })
})