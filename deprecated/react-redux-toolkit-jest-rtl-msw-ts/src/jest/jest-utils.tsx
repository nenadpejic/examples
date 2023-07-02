import { CombinedState, EnhancedStore } from '@reduxjs/toolkit'
import { render as rtlRender } from '@testing-library/react'
// import { createMemoryHistory, MemoryHistory } from 'history'
import React, { ReactElement } from 'react'
// import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
// import { Router } from 'react-router-dom'
import { makeStore, StoreState } from 'redux/store'

let store: EnhancedStore<CombinedState<StoreState>>
// let history: MemoryHistory<unknown>

const customRender = (
  ui: ReactElement,
  {
    withStore = false,
    withRouter = false,
    withToaster = false,
    ...renderOptions
  } = {}
) => {
  const AllTheProviders: React.FC = ({ children }) => {
    store = makeStore()
    // history = createMemoryHistory()

    let _children = <>{children}</>

    // if (withRouter) {
    //   _children = <Router history={history} children={_children} />
    // }
    // if (withToaster) {
    //   _children = <>
    //     {_children}
    //     <Toaster />
    //   </>
    // }
    if (withStore) {
      _children = <Provider store={store} children={_children} />
    }

    return _children

  }
  return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions })
}

export * from '@testing-library/react'
export {
  customRender as render,
  store,
  // history
}
