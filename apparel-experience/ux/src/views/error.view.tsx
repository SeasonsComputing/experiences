import './error.view.css'

type ErrorViewProps = {
  message: string
  code: string
}

export const ErrorView = ({ message, code }: ErrorViewProps) => {
  if (message.length <= 2) throw new Error('message length must be > 2')
  if (code.length <= 2) throw new Error('code length must be > 2')

  return (
    <div className='ErrorView'>
      <div>
        <p id="error">{message.substr(0, 1)}<span>{message.substr(1, 1)}</span>{message.substr(2)}</p>
        <p id="code">{code.substr(0, 1)}<span>{code.substr(1, 1)}</span><span>{code.substr(2)}</span></p>
      </div>
    </div>
  );
}