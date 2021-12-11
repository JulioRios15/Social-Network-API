import  mongoose, {Schema, Document, ObjectId}  from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
    username: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInput, Document {  
    thoughts: ObjectId[];
    friends: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        thoughts: [
            {type: mongoose.Schema.Types.ObjectId, ref: "thought", }
        ],
        friends: [
            {type: mongoose.Schema.Types.ObjectId, ref: "User", }
        ],
    }, 
    {
        timestamps: true
    }
);

userSchema.pre("save", async function(next){
    let user = this as UserDocument;

    if(!user.isModified('password')){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.virtual("friendCount").get(function(this: UserDocument){
    return this.friends.length;
});

userSchema.methods.comparePassword = async function(
    candidatePassword: string
    ): Promise<boolean>{
        const user = this as UserDocument;
        return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;


