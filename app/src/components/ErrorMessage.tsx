import React, { useState, useEffect } from "react";
import styled from "styled-components";

type ErrorProps = {
    errorMessage: any;
};

const ErrorContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .8rem;
  background-color: #f6f5f5f1;
  color: #EC9937;
  font-size: 1.2rem;
  font-weight: 400;
  box-shadow: 0 2px 5px rgba(138, 137, 137, 0.171);
  opacity: 1;
  transition: opacity 0.3s ease;
`;

const ErrorMessage: React.FC<ErrorProps> = ({ errorMessage }) => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {visible && (
                <ErrorContainer>
                    <p>{errorMessage}</p>
                </ErrorContainer>
            )}
        </>
    );
};

export default ErrorMessage;