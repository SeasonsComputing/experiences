import './error.component.css'

type ErrorSplashProps = {
  message: string
  code: string
}

export function ErrorSplash({ message, code }: ErrorSplashProps) {
  if (message.length <= 2) throw new Error('message length must be > 2')
  if (code.length <= 2) throw new Error('code length must be > 2')

  return (
    <div className='ErrorSplash'>
      <div>
        <p id="error">{message.substr(0, 1)}<span>{message.substr(1, 1)}</span>{message.substr(2)}</p>
        <p id="code">{code.substr(0, 1)}<span>{code.substr(1, 1)}</span><span>{code.substr(2)}</span></p>
      </div>
    </div>
  );
}