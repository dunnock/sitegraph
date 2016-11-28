import React from 'react'

export function bindSigma(elements: mixed, sigma) {
        return React.Children.map(elements, 
            (element) => React.cloneElement(element, { sigma }))
    }
