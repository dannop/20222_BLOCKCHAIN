import { ChangeEvent, useState } from 'react';

import './style.scss';

interface SearchBarProps {
    placeholder?: string,
    className?: string,
    onSearch: Function,
    setIsLoading?: Function
}

const SearchBar = (props: SearchBarProps) => {
    const { className, onSearch, setIsLoading, ...inputProps } = props;

    const [value, setValue] = useState('');
    const [debounce_timeout, setDebounceTimeout] = useState<any>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (onSearch) {
            if (setIsLoading) setIsLoading(true);
            clearTimeout(debounce_timeout);
            const current_timeout = setTimeout(async () => {
                await onSearch(event.target.value)
                if (setIsLoading) setIsLoading(false)
            }, 1500);
            setDebounceTimeout(current_timeout);
        }
    }

    const search_icon = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.755 14.255H14.965L14.685 13.985C15.665 12.845 16.255 11.365 16.255 9.755C16.255 6.165 13.345 3.255 9.755 3.255C6.165 3.255 3.255 6.165 3.255 9.755C3.255 13.345 6.165 16.255 9.755 16.255C11.365 16.255 12.845 15.665 13.985 14.685L14.255 14.965V15.755L19.255 20.745L20.745 19.255L15.755 14.255ZM9.755 14.255C7.265 14.255 5.255 12.245 5.255 9.755C5.255 7.265 7.265 5.255 9.755 5.255C12.245 5.255 14.255 7.265 14.255 9.755C14.255 12.245 12.245 14.255 9.755 14.255Z" fill="black"/>
        </svg>
    )

    return (
        <div className={`search-bar ${className ? className : ''}`}>
            <input 
                type="search" 
                name="search" 
                id="search" 
                value={value}
                onChange={onChange}
                {...inputProps}
            />
            {search_icon}
        </div>
    )
}

export default SearchBar