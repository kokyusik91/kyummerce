import styled from '@emotion/styled'

type ButtonProps = {
  children: string
  onClick?: () => void
}

function Button({ children, onClick }: ButtonProps) {
  return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>
}

const ButtonContainer = styled.button`
  padding: 8px;
  border-radius: 8px;
  background-color: #2f3e39;
  color: white;
`

export default Button
