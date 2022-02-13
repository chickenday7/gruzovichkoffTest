import {Grid, Theme} from "@mui/material";
import {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";


interface IPage {
    id: string,
    options: {
        params: {
            fields: { isDynamic: boolean }
        }
    },
    count: number,
    color: string,
    data: string,
    messageFromSSR: string
}
const Page: React.FC<IPage> = (
    {
        id,
        options,
        count,
        color,
        data,
        messageFromSSR
    }
) => {
    return <MyWonderfulComponent id={id} options={options} count={count} color={color} messageFromSSR={messageFromSSR} data={data}>Im text from a
        component</MyWonderfulComponent>
}




interface IMyWonderfulComponents {
    id:string,
    options: {
        params: {
            fields: { isDynamic: boolean }
        }
    },
    children: React.ReactNode,
    [p:string]:any
}
function MyWonderfulComponent({id, options, children, ...other}:IMyWonderfulComponents) {
    const {count, color , messageFromSSR} = other;

    const useStyles = makeStyles<Theme, {color:string}>(theme => ({
        h1: {
            color
        },
    }));

    const classes = useStyles(color)

    const [summ, setSumm] = useState<number>(count);

    useEffect(() => {
        if (id && options?.params?.fields?.isDynamic) {
            setSumm(summ + 1);
        }

    }, []);

    return (
        <>
            <h1 className={classes.h1}>Hello World!</h1>
            <Grid container columns={{xs:3}} spacing={2}>
                <Grid item={true} xs={12}>
                    {children}
                </Grid>
                <Grid item xs={2}>
                    {summ}
                </Grid>
                <Grid item xs={2}>
                    {`${messageFromSSR}, but i in component`}
                </Grid>
            </Grid>
        </>

    );

}



type GetServerSideProps = () => Promise<{
    props: {
        messageFromSSR: string,
        id:string,
        options: {
            params: {
                fields: { isDynamic: boolean }
            }
        },
        count: number,
        color: string,
        data: string,
    };
}>
export const getServerSideProps: GetServerSideProps = async () => {
    const messageFromSSR = 'Hello from SSR'
    const id = `qeqdsadsdsddd`
    const count = 5
    const color = 'red'
    const data = 'something data'
    const options = {
        params: {
            fields: {
                isDynamic: true
            }
        }
    }
    console.log(messageFromSSR)
    return {
        props: {
            messageFromSSR,
            id,
            count,
            color,
            data,
            options
        }
    }
}


export default Page
